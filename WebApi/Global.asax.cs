﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;
using TiendaVirtual.Entidades;
using TiendaVirtual.LogicaNegocio;

namespace WebApi
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);

            string cadenaConexion =
                System.Configuration.ConfigurationManager.
                ConnectionStrings["TiendaVirtual"].
                ConnectionString;

            string tipo = System.Configuration.ConfigurationManager.AppSettings["motorDao"];

            Application["logicaNegocio"] = new LogicaNegocio(tipo, cadenaConexion);
            Application["carrito"] = new Carrito(null);
        }
        
            
        
    }
}
