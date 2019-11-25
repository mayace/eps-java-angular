/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eps.rest;

import com.eps.controller.IncorporacionBean;
import com.eps.model.Incorporacion;
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
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

/**
 *
 * @author nikola
 */

@Path("incorporaciones")
@RequestScoped
@Produces("application/json")
@Consumes("application/json")
public class IncorporacionEndPoint {
    
    @Inject
    IncorporacionBean incorporacionBean;
    
    @GET
    public ResponseJSON listAll(
            @QueryParam("skip") @DefaultValue("0") Integer skip,
            @QueryParam("limit") @DefaultValue("0") Integer limit,
            @QueryParam("carnet") @DefaultValue("0") Long carnet){
        ResponseJSON response = incorporacionBean.findAll(skip,limit,carnet);
        return response;
    }
    
    @GET
    @Path("/count")
    public ResponseJSON count(){
        return incorporacionBean.count();
    }
    
    @POST
    public ResponseJSON create(@Valid Incorporacion incorporacion){
        return incorporacionBean.create(incorporacion);
    }
    
    @GET
    @Path("/{id_incorporacion:[0-9][0-9]*}")
    public ResponseJSON findBy(@PathParam("id_incorporacion") Long id){
        ResponseJSON response = incorporacionBean.findIncorporacion(id);
        return response;
    }
    
    @PUT
    @Path("/{id_incorporacion:[0-9][0-9]*}")
    public ResponseJSON update(@PathParam("id_incorporacion") Long id, @Valid Incorporacion incorporacion){
        ResponseJSON response = incorporacionBean.update(id, incorporacion);
        return response;
    }
    
    @DELETE
    @Path("/{id_incorporacion:[0-9][0-9]*}")
    public ResponseJSON delete(@PathParam("id_incorporacion") Long id){
        ResponseJSON response = incorporacionBean.delete(id);
        return response;
    }
}
