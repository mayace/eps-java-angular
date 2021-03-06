/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eps.rest;

import com.eps.controller.UsuarioBean;
import com.eps.model.LogModel;
import com.eps.model.ResponseJSON;
import com.eps.model.Usuario;
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

@Path("usuario")
@RequestScoped
@Produces("application/json")
@Consumes("application/json")
public class UsuarioEndPoint {
    
    @Inject
    UsuarioBean usuarioBean;
    
    @GET
    public ResponseJSON listAll(){
        ResponseJSON response = usuarioBean.findAll();
        return response;
    }
    
    @POST
    @JsonView(View.Search.class)
    @Path("/login")
    public ResponseJSON login(@Valid LogModel login){
        ResponseJSON response = usuarioBean.validatePassword(login.getNick(), login.getPass());
        return response;
    }
    
    @POST
    public ResponseJSON create(@Valid Usuario usuario){
        return usuarioBean.create(usuario);
    }
    
    @PUT
    @Path("/{id_usuario:[0-9][0-9]*}")
    public ResponseJSON update(@PathParam("id_usuario") Long id, @Valid Usuario usuario){
        ResponseJSON response = usuarioBean.update(id, usuario);
        return response;
    }
    
    @DELETE
    @Path("/{id_rol:[0-9][0-9]*}")
    public ResponseJSON delete(@PathParam("id_rol") Long id){
        ResponseJSON response = usuarioBean.delete(id);
        return response;
    }
}
