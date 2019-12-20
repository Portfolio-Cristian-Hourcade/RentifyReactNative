<?php
function generarCodigo($longitud) {
 $key = '';
 $pattern = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
 $max = strlen($pattern)-1;
 for($i=0;$i < $longitud;$i++) $key .= $pattern{mt_rand(0,$max)};
 return $key;
}
 
//Ejemplo de uso
 
 // genera un c車digo de 6 caracteres de longitud.

error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once '../vendor/autoload.php';

/********************************************************/
MercadoPago\SDK::setAccessToken("APP_USR-2427548015768286-110601-97433936a0d80e0baca1c61dc8a9a3df-242652951");
/************* RECIBE ID Y TOPIC ************************/

$keyReserva = generarCodigo(20);
$topic = null;
$id = null;

$keyClient = null;
$estado = "free";

# Validamos la acci車n del servidor
if(!isset($_GET["topic"]) && !isset($_GET["id"])){
    http_response_code(400);
    return;
}

if($_GET["topic"] == "merchant_order"){
    http_response_code(400);
    return;
}

if(!isset($_GET["topic"])){
    $topic = $_POST["topic"];    
}else{
    $topic = $_GET["topic"];
}

if(!isset($_GET["id"])){
    $id= $_POST["id"];    
}else{
    $id = $_GET["id"];
}

# Testeamos que la id recivida sea de un pago reciente
$payment = MercadoPago\Payment::find_by_id($id);

# Verificamos que la compra se haya efectuado
if($payment->status == 'approved'){
    if($payment->transaction_details->total_paid_amount >= $payment->transaction_amount){
        $estado = "Acreditado";
    }else{
        $estado = "Pago no acreditado";
    }
}else{
    $estado = "Pago pendiente";
}
if($payment->status == 'approved'){
    // ************************************************************************************************ //
// *************************************  Reserva DATA  ******************************************* //
#User CloudFirestore
$dataExternal = explode('fecha:', $payment->external_reference);

$lapsoFecha = $dataExternal[1];
$keyRentador = explode('|', $dataExternal[0])[0];
$keyInquilino = explode('|',$dataExternal[0])[1];
$keyProduct = explode('|',$dataExternal[0])[2];

#Url database
$url = "https://firestore.googleapis.com/v1beta1/projects/myspace-632e9/databases/(default)/documents/reservas/".$keyReserva;




$firestore_data  = [
    'key' => ['stringValue' => $keyReserva],
    'status' => ['integerValue' => 0],
    'keyProduct' => ['stringValue' => $keyProduct],
    'keyRentador' => ['stringValue' => $keyRentador],
    'keyInquilino' => ['stringValue' => $keyInquilino],
    'estadia' => ['stringValue' => $lapsoFecha],
    'valor' => ['stringValue' => ''.$payment->transaction_amount],
    'idCompra' => ['stringValue' => $_GET['id']]
];
$data = ["fields" => (object)$firestore_data];
$json = json_encode($data);

#Update Profile
$curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_HTTPHEADER => array('Content-Type: application/json',
            'Content-Length: ' . strlen(json_encode($data)),
            'X-HTTP-Method-Override: PATCH'),
        CURLOPT_URL => $url,
        CURLOPT_USERAGENT => 'cURL',
        CURLOPT_POSTFIELDS => json_encode($data)
    ));

    $response = curl_exec( $curl );
    //print_r($response);
    curl_close( $curl );



// ************************************************************************************************ //
// ************************************************************************************************ //
    
// ************************************************************************************************ //
// *************************************  CLIENTE DATA  ******************************************* //
#User CloudFirestore
$dataExternal = explode('fecha:', $payment->external_reference);

$lapsoFecha = $dataExternal[1];
$keyRentador = explode('|', $dataExternal[0])[0];
$keyInquilino = explode('|',$dataExternal[0])[1];
$keyProduct = explode('|',$dataExternal[0])[2];

#Url database
$url = "https://firestore.googleapis.com/v1beta1/projects/myspace-632e9/databases/(default)/documents/clientes/".$keyInquilino;

#Listado de usuario - CURL
$cht = curl_init();
curl_setopt($cht, CURLOPT_URL, $url);
curl_setopt($cht, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($cht);
curl_close($cht);

#Decodificacion del JSON
$info = json_decode($response, true);
$jsonPush;

if(isset($info['fields']['reservas']['arrayValue']) == 1){
      $array = [['mapValue' => ['fields' => [
        'fecha' => ['stringValue' => $lapsoFecha],
        'status' => ['integerValue' => 0],
        'keyProduct' => ['stringValue' => $keyProduct],
        'keyRentador' => ['stringValue' => $keyRentador]]]]];
        
    array_push($info['fields']['reservas']['arrayValue']['values'],['stringValue' => $keyReserva]);
}else{
   $info['fields']['reservas']['arrayValue'] = ['values' => [['stringValue' => $keyReserva]]];
}

#Update Profile
$curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_HTTPHEADER => array('Content-Type: application/json',
            'Content-Length: ' . strlen(json_encode($info)),
            'X-HTTP-Method-Override: PATCH'),
        CURLOPT_URL => $url,
        CURLOPT_USERAGENT => 'cURL',
        CURLOPT_POSTFIELDS => json_encode($info)
    ));

    $response = curl_exec( $curl );
  //  print_r($response);
    curl_close( $curl );



// ************************************************************************************************ //
// ************************************************************************************************ //
// *************************************  RENTADO DATA  ******************************************* //
#User CloudFirestore
$dataExternal = explode('fecha:', $payment->external_reference);

$lapsoFecha = $dataExternal[1];
$keyRentador = explode('|', $dataExternal[0])[0];
$keyInquilino = explode('|',$dataExternal[0])[1];
$keyProduct = explode('|',$dataExternal[0])[2];

#Url database
$url = "https://firestore.googleapis.com/v1beta1/projects/myspace-632e9/databases/(default)/documents/clientes/".$keyRentador;

#Listado de usuario - CURL
$cht = curl_init();
curl_setopt($cht, CURLOPT_URL, $url);
curl_setopt($cht, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($cht);
curl_close($cht);

#Decodificacion del JSON
$info = json_decode($response, true);
$jsonPush;

if(isset($info['fields']['ventas']['arrayValue']) == 1){
    $array = [['mapValue' => ['fields' => [
        'fecha' => ['stringValue' => $lapsoFecha],
        'status' => ['integerValue' => 0],
        'keyProduct' => ['stringValue' => $keyProduct],
        'keyInquilino' => ['stringValue' => $keyInquilino],
        'keyRerva'=> ['stringValue' => $keyReserva] ]]]];
    
    array_push($info['fields']['ventas']['arrayValue']['values'],$array);
}else{
    $array = [['mapValue' => ['fields' => [
        'fecha' => ['stringValue' => $lapsoFecha],
        'status' => ['integerValue' => 0],
        'keyProduct' => ['stringValue' => $keyProduct],
        'keyInquilino' => ['stringValue' => $keyInquilino],
        'keyRerva'=> ['stringValue' => $keyReserva] ]]]];
        
   $info['fields']['ventas']['arrayValue'] = ['values' => $array];
}

#Update Profile
$curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_HTTPHEADER => array('Content-Type: application/json',
            'Content-Length: ' . strlen(json_encode($info)),
            'X-HTTP-Method-Override: PATCH'),
        CURLOPT_URL => $url,
        CURLOPT_USERAGENT => 'cURL',
        CURLOPT_POSTFIELDS => json_encode($info)
    ));

    $response = curl_exec( $curl );
    //print_r($response);
    curl_close( $curl );

    
    $urlNotification = "https://exp.host/--/api/v2/push/send";
$data = array(
    'to' => $info['fields']['token']['stringValue'],
    'sound' => 'default',
    'body' => 'Vendiste una reserva!!'
);
 
$payload = json_encode($data);
 
// Prepare new cURL resource
$ch = curl_init($urlNotification);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLINFO_HEADER_OUT, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
// Set HTTP Header for POST request 
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'Content-Length: ' . strlen($payload))
);
 
// Submit the POST request
$result = curl_exec($ch);
 print_r($result);
// Close cURL session handle
curl_close($ch);
    
/**'{
                "to" :"ExponentPushToken[DRBDKVMSisUBkvczkpZbHr]",
                "sound":"default",
                "body":"Hola!!"
                }'*/
    //$response = curl_exec( $curl );
    //print_r($response);
    //curl_close( $curl );


// ************************************************************************************************ //
// ************************************************************************************************ //
// *************************************  CLIENTE DATA  ******************************************* //
#User CloudFirestore
$dataExternal = explode('fecha:', $payment->external_reference);

$lapsoFecha = $dataExternal[1];
$keyRentador = explode('|', $dataExternal[0])[0];
$keyInquilino = explode('|',$dataExternal[0])[1];
$keyProduct = explode('|',$dataExternal[0])[2];

#Url database
$url = "https://firestore.googleapis.com/v1beta1/projects/myspace-632e9/databases/(default)/documents/productos/".$keyProduct;

#Listado de usuario - CURL
$cht = curl_init();
curl_setopt($cht, CURLOPT_URL, $url);
curl_setopt($cht, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($cht);
curl_close($cht);

#Decodificacion del JSON
$info = json_decode($response, true);
$jsonPush;

if(isset($info['fields']['dataReservation']['arrayValue']) == 1){
     $array = [['mapValue' => ['fields' => ['date' => ['stringValue' => $lapsoFecha],
    'status' => ['integerValue' => 0],
    'keyClient'=>['stringValue' => $keyInquilino],
    'keyRentador'=> ['stringValue' => $keyRentador] ]]]];
    
    array_push($info['fields']['dataReservation']['arrayValue']['values'], $array );
}else{
    $array = [['mapValue' => ['fields' => ['date' => ['stringValue' => $lapsoFecha],
    'status' => ['integerValue' => 0],
    'keyClient'=>['stringValue' => $keyInquilino],
    'keyRentador'=> ['stringValue' => $keyRentador] ]]]];
    
    $info['fields']['dataReservation']['arrayValue'] = ['values' => $array];
}


#Update Profile
$curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_HTTPHEADER => array('Content-Type: application/json',
            'Content-Length: ' . strlen(json_encode($info)),
            'X-HTTP-Method-Override: PATCH'),
        CURLOPT_URL => $url,
        CURLOPT_USERAGENT => 'cURL',
        CURLOPT_POSTFIELDS => json_encode($info)
    ));

    $response = curl_exec( $curl );
    //print_r($response);
    curl_close( $curl );
}


// ************************************************************************************************ //



?>

