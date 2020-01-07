<?php

namespace app\controllers;


class controller{
    public function __construct($container){
        $this->container = $container;
    }
    public function accueil($request, $response){
  return $this->container->view->render($response, "utilisateur/Listeadhesion.html.twig",["ladhesion"=>$listeAdhesion]);
    }

}