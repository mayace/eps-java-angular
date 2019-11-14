/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eps.controller;

import com.eps.model.Carta;
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
public class CartaBean {

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
    
    @PersistenceContext
    EntityManager em;
    
    public ResponseJSON create(Carta carta){
        ResponseJSON response = new ResponseJSON();
        em.persist(carta);
        response.setData(carta);
        response.setTotal(1);
        return response;
    }
    
    public ResponseJSON count(){
        ResponseJSON response = new ResponseJSON();
        
        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<Long> query = builder.createQuery(Long.class);
        query.select(builder.count(query.from(Carta.class)));
        
        response.setTotal(em.createQuery(query).getSingleResult().intValue());        
        return response;
    }
    
    public ResponseJSON findCarta(Long id){
        ResponseJSON response = new ResponseJSON();
        Carta data = em.find(Carta.class,id);
        if(data != null){
            response.setData(data);
            response.setTotal(1);
        } else {
            response.setTotal(0);
            response.setError("Error en recuperacion de carta");
        }
        return response;
    }
    
    public ResponseJSON findAll(Integer skip, Integer limit, String nombre){
        //consulta
        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<Carta> query = builder.createQuery(Carta.class);
        Root<Carta> root = query.from(Carta.class);
        query.select(root);
        
        Predicate nameLike = builder.like(builder.lower(root.<String>get("destinatario")),"%" + nombre.toLowerCase() + "%");
        
        query.where(
                nameLike
        );
        
        TypedQuery<Carta> finalQuery = em.createQuery(query);
        Integer count = finalQuery.getResultList().size();
        if (skip >= 0 && limit > 0) {
            finalQuery.setFirstResult(skip);
            finalQuery.setMaxResults(limit);
        }
        
        List<Carta> data = finalQuery.getResultList();
        
        //respuesta
        ResponseJSON response = new ResponseJSON(data,count,skip,limit);
        return response;
    }
    
    public ResponseJSON update(Long id, Carta carta){
        ResponseJSON response = new ResponseJSON();
        Carta data = em.find(Carta.class, id);
        if(data != null && carta.getIdCarta() != null && data.getIdCarta().equals(carta.getIdCarta())){
            em.merge(carta);
            response.setData(carta);
            response.setTotal(1);
        } else {
            response.setTotal(0);
            response.setError("No existe la carta o no corresponde el identificador");
        }
        return response;
    }
    
    public ResponseJSON delete(Long id){
        ResponseJSON response = new ResponseJSON();
        Carta data = em.find(Carta.class, id);
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
