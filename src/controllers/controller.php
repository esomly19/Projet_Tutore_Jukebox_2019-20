<?php

namespace app\Controllers;

use app\models\Musique;

class controller{
    public function __construct($container){
        $this->container = $container;
    }
    public function checkPlaylist($request, $response){
           $lanime = Musique::all();
  return $this->container->view->render($response, "checkPlaylist.html.twig", ['lanime'=>$lanime]);
    }
        public function createPlaylist($request, $response){
  return $this->container->view->render($response, "createPlaylist.html.twig");
    }
       
        public function checkReclam($request, $response){
  return $this->container->view->render($response, "checkReclam.html.twig");
    }

}