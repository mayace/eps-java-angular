/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eps.controller;

import com.eps.model.ResponseJSON;
import com.eps.model.Usuario;
import com.eps.utils.AES;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

/**
 *
 * @author nikola
 */
@Stateless
public class UsuarioBean {

    @PersistenceContext
    EntityManager em;
    
    final String key = "|@eps14&&@eps14@|";
    
    public ResponseJSON create(Usuario usuario){
        ResponseJSON response = new ResponseJSON();
        em.persist(usuario);
        response.setData(usuario);
        response.setTotal(1);
        return response;
    }
    
    public ResponseJSON findAll(){
        //consulta
        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<Usuario> query = builder.createQuery(Usuario.class);
        Root<Usuario> root = query.from(Usuario.class);
        query.select(root);
        
        TypedQuery<Usuario> finalQuery = em.createQuery(query);
        Integer count = finalQuery.getResultList().size();
        
        List<Usuario> data = finalQuery.getResultList();
        
        //respuesta
        ResponseJSON response = new ResponseJSON(data,count,0,0);
        return response;
    }
    
    public ResponseJSON validatePassword(String nick,String password){
        //consulta
        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<Usuario> query = builder.createQuery(Usuario.class);
        Root<Usuario> root = query.from(Usuario.class);
        query.select(root);
        
        Predicate general = builder.and(builder.equal(root.<String>get("pass"),AES.encrypt(password, key)),builder.equal(root.<String>get("nick"),nick));
        
        query.where(
                general
        );
        
        TypedQuery<Usuario> finalQuery = em.createQuery(query);
        
        Usuario data = finalQuery.getSingleResult();
        
        int count = 0;
        
        if(data != null){
            count = 1;
        }
        
        //respuesta
        ResponseJSON response = new ResponseJSON(data,count,0,0);
        return response;
    }
    
    public ResponseJSON delete(Long id){
        ResponseJSON response = new ResponseJSON();
        Usuario data = em.find(Usuario.class, id);
        if(data != null){
            em.remove(data);
            response.setTotal(1);
        } else {
            response.setTotal(0);
            response.setError("No existe la carta");
        }
        return response;
    }
}
