/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eps.controller;

import com.eps.model.Estudiante_;
import com.eps.model.Incorporacion;
import com.eps.model.Incorporacion_;
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
public class IncorporacionBean {
    
    @PersistenceContext
    EntityManager em;
    
    public ResponseJSON create(Incorporacion incorporacion){
        ResponseJSON response = new ResponseJSON();
        em.persist(incorporacion);
        response.setData(incorporacion);
        response.setTotal(1);
        return response;
    }
    
    public ResponseJSON count(){
        ResponseJSON response = new ResponseJSON();
        
        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<Long> query = builder.createQuery(Long.class);
        query.select(builder.count(query.from(Incorporacion.class)));
        
        response.setTotal(em.createQuery(query).getSingleResult().intValue());        
        return response;
    }
    
    public ResponseJSON findIncorporacion(Long id){
        ResponseJSON response = new ResponseJSON();
        Incorporacion data = em.find(Incorporacion.class,id);
        if(data != null){
            response.setData(data);
            response.setTotal(1);
        } else {
            response.setTotal(0);
            response.setError("No existe la institucion");
        }
        return response;
    }
    
    public ResponseJSON findAll(Integer skip, Integer limit, Long carnet){
        //consulta
        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<Incorporacion> query = builder.createQuery(Incorporacion.class);
        Root<Incorporacion> root = query.from(Incorporacion.class);
        
        query.select(root);
        
        //Predicate nameLike = builder.like(builder.lower(root.get("nombre")),"%" + nombre.toLowerCase() + "%");
        
        if(carnet > 0){
            Predicate restriction = builder.equal(root.get(Incorporacion_.fkEstudianteCarnet).get(Estudiante_.carnet),carnet);
            query.where(
                    restriction
            );
        }
        
        TypedQuery<Incorporacion> finalQuery = em.createQuery(query);
        Integer count = finalQuery.getResultList().size();
        if (skip >= 0 && limit > 0) {
            finalQuery.setFirstResult(skip);
            finalQuery.setMaxResults(limit);
        }
        
        List<Incorporacion> data = finalQuery.getResultList();
        
        //respuesta
        ResponseJSON response = new ResponseJSON(data,count,skip,limit);
        return response;
    }
    
    public ResponseJSON update(Long id, Incorporacion incorporacion){
        ResponseJSON response = new ResponseJSON();
        Incorporacion data = em.find(Incorporacion.class, id);
        if(data != null && incorporacion.getIdIncorporacion() != null && data.getIdIncorporacion().equals(incorporacion.getIdIncorporacion())){
            em.merge(incorporacion);
            response.setData(incorporacion);
            response.setTotal(1);
        } else {
            response.setTotal(0);
            response.setError("No existe la institucion o no corresponde el identificador");
        }
        return response;
    }
    
    public ResponseJSON delete(Long id){
        ResponseJSON response = new ResponseJSON();
        Incorporacion data = em.find(Incorporacion.class, id);
        if(data != null){
            em.remove(data);
            response.setTotal(1);
        } else {
            response.setTotal(0);
            response.setError("No existe la institucion");
        }
        return response;
    }
}
