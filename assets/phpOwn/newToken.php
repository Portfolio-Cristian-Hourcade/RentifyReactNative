<?php
  error_reporting(E_ALL);
  ini_set('display_errors', '1');

  require_once '../vendor/autoload.php';
  MercadoPago\SDK::setAccessToken("APP_USR-2427548015768286-110601-97433936a0d80e0baca1c61dc8a9a3df-242652951");

  $keyCliente = $_GET["keyCliente"];
  $keyProducto = $_GET["keyProduct"];
  $keyOwner = $_GET["keyOwner"];
  $fechaInicio = $_GET["fechaInicio"];
  $fechaFin = $_GET["fechaFin"];
  
  $precio = $_GET["precio"];
  
  $preference = new MercadoPago\Preference();
  
  # Setting item      
  $item = new MercadoPago\Item();
  $item->title = "Rentify - Reserva de alquiler";
  $item->quantity = 1;
  $item->currency_id = "ARS";
  $item->unit_price = $precio;
    
  # Setting preferences
  $preference->items = array($item);
  
  $preference->external_reference = $keyCliente."|".$keyOwner."|".$keyProducto."fecha:".$fechaInicio."|".$fechaFin;

  $preference->notification_url = "https://changofree.com/phpServer/notificationPayment.php";

  # Save and posting preference
  $preference->save();
  
  # Getting url from MercadoPago

  echo $preference->init_point;
  ?>