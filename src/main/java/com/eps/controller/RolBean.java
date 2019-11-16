/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eps.controller;

import com.eps.model.Rol;
import com.eps.model.ResponseJSON;
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
public class RolBean {

    @PersistenceContext
    EntityManager em;
    
    public ResponseJSON create(Rol rol){
        ResponseJSON response = new ResponseJSON();
        em.persist(rol);
        response.setData(rol);
        response.setTotal(1);
        return response;
    }
    
    public ResponseJSON findAll(){
        //consulta
        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<Rol> query = builder.createQuery(Rol.class);
        Root<Rol> root = query.from(Rol.class);
        query.select(root);
        
        TypedQuery<Rol> finalQuery = em.createQuery(query);
        Integer count = finalQuery.getResultList().size();
        
        List<Rol> data = finalQuery.getResultList();
        
        //respuesta
        ResponseJSON response = new ResponseJSON(data,count,0,0);
        return response;
    }
    
    public ResponseJSON delete(Long id){
        ResponseJSON response = new ResponseJSON();
        Rol data = em.find(Rol.class, id);
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
