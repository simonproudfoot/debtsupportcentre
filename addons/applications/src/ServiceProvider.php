<?php
namespace Simonp\Applications;
use Statamic\Providers\AddonServiceProvider;
class ServiceProvider extends AddonServiceProvider
{
  

  protected $routes = [
    'cp' => __DIR__ . '/../routes/cp.php',
  ];

  
 
  
}
