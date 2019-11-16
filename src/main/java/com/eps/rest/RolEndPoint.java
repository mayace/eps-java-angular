/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eps.rest;

import com.eps.controller.RolBean;
import com.eps.model.Rol;
import com.eps.model.ResponseJSON;
import com.fasterxml.jackson.annotation.JsonView;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

/**
 *
 * @author nikola
 */

@Path("rol")
@RequestScoped
@Produces("application/json")
@Consumes("application/json")
public class RolEndPoint {
    
    @Inject
    RolBean rolBean;
    
    @GET
    @JsonView(View.Search.class)
    public ResponseJSON listAll(){
        ResponseJSON response = rolBean.findAll();
        return response;
    }
    
    @POST
    public ResponseJSON create(@Valid Rol rol){
        return rolBean.create(rol);
    }
    
    @DELETE
    @Path("/{id_rol:[0-9][0-9]*}")
    public ResponseJSON delete(@PathParam("id_rol") Long id){
        ResponseJSON response = rolBean.delete(id);
        return response;
    }
}
