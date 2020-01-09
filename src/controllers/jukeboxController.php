<?php

namespace app\Controllers;

use app\models\Jukebox;

class jukeboxController{
    public function __construct($container){
        $this->container = $container;
    }

    public function showJukebox($request, $response)
    {
                 $juke = Jukebox::all();
  return $this->container->view->render($response, "checkJukebox.html.twig", ['juke'=>$juke]);
    }
   

}