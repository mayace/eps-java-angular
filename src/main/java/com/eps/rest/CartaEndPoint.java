/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eps.rest;

import com.eps.controller.CartaBean;
import com.eps.model.Carta;
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

@Path("cartas")
@RequestScoped
@Produces("application/json")
@Consumes("application/json")
public class CartaEndPoint {
    
    @Inject
    CartaBean cartaBean;
    
    @GET
    public ResponseJSON listAll(
            @QueryParam("nombre") @DefaultValue("%") String nombre,
            @QueryParam("skip") @DefaultValue("0") Integer skip,
            @QueryParam("limit") @DefaultValue("0") Integer limit){
        ResponseJSON response = cartaBean.findAll(skip,limit,nombre);
        return response;
    }
    
    @GET
    @Path("/count")
    public ResponseJSON count(){
        return cartaBean.count();
    }
    
    @POST
    public ResponseJSON create(@Valid Carta carta){
        return cartaBean.create(carta);
    }
    
    @GET
    @Path("/{id_carta:[0-9][0-9]*}")
    public ResponseJSON findBy(@PathParam("id_carta") Long id){
        ResponseJSON response = cartaBean.findCarta(id);
        return response;
    }
    
    @PUT
    @Path("/{id_carta:[0-9][0-9]*}")
    public ResponseJSON update(@PathParam("id_carta") Long id, @Valid Carta carta){
        ResponseJSON response = cartaBean.update(id, carta);
        return response;
    }
    
    @DELETE
    @Path("/{id_carta:[0-9][0-9]*}")
    public ResponseJSON delete(@PathParam("id_carta") Long id){
        ResponseJSON response = cartaBean.delete(id);
        return response;
    }
}
