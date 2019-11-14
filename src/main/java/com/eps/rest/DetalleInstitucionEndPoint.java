/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eps.rest;

import com.eps.controller.DetalleInstitucionBean;
import com.eps.model.ResponseJSON;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

/**
 *
 * @author nikola
 */

@Path("detalle-institucion")
@RequestScoped
@Produces("application/json")
@Consumes("application/json")
public class DetalleInstitucionEndPoint {
    
    @Inject
    DetalleInstitucionBean detalleInstitucionBean;
    
    @GET
    @Path("/count")
    public ResponseJSON count(){
        return detalleInstitucionBean.count();
    }
}
