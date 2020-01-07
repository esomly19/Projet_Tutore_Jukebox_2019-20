<?php

namespace app\controllers;


class controller{
    public function __construct($container){
        $this->container = $container;
    }
    public function checkPlaylist($request, $response){
  return $this->container->view->render($response, "utilisateur/checkPlaylist.html.twig",["ladhesion"=>$listeAdhesion]);
    }
        public function createPlaylist($request, $response){
  return $this->container->view->render($response, "utilisateur/createPlaylist.html.twig",["ladhesion"=>$listeAdhesion]);
    }
        public function checkJukeboxt($request, $response){
  return $this->container->view->render($response, "utilisateur/Listeadhesion.html.twig",["ladhesion"=>$listeAdhesion]);
    }
        public function checkReclam($request, $response){
  return $this->container->view->render($response, "utilisateur/Listeadhesion.html.twig",["ladhesion"=>$listeAdhesion]);
    }

}