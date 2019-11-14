/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eps.controller;

import com.eps.model.Carrera;
import com.eps.model.DetalleInstitucion;
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
public class DetalleInstitucionBean {

    @PersistenceContext
    EntityManager em;
    
    public ResponseJSON count(){
        ResponseJSON response = new ResponseJSON();
        
        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<Long> query = builder.createQuery(Long.class);
        query.select(builder.count(query.from(DetalleInstitucion.class)));
        
        response.setTotal(em.createQuery(query).getSingleResult().intValue());        
        return response;
    }
    
}
