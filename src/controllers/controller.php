<?php

namespace app\controllers;


class controller{
    public function __construct($container){
        $this->container = $container;
    }
    public function checkPlaylist($request, $response){
  return $this->container->view->render($response, "checkPlaylist.html.twig");
    }
        public function createPlaylist($request, $response){
  return $this->container->view->render($response, "createPlaylist.html.twig");
    }
        public function checkJukeboxt($request, $response){
  return $this->container->view->render($response, "checkJukebox.html.twig");
    }
        public function checkReclam($request, $response){
  return $this->container->view->render($response, "checkReclam.html.twig");
    }

}