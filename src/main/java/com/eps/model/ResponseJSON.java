/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eps.model;

import com.eps.rest.View;
import com.fasterxml.jackson.annotation.JsonView;

/**
 *
 * @author nikola
 */
public class ResponseJSON {
    
    @JsonView(View.Search.class)
    private Object data;
    @JsonView(View.Search.class)
    private Integer total;
    @JsonView(View.Search.class)
    private String error;
    @JsonView(View.Search.class)
    private Integer limit;
    @JsonView(View.Search.class)
    private Integer skip;

    public ResponseJSON(){
    
    }
    
    public ResponseJSON(Object data, Integer total, Integer skip, Integer limit) {
        this.data = data;
        this.total = total;
        this.limit = limit;
        this.skip = skip;
    }
    
    public ResponseJSON(Object data, Integer total, Integer skip, Integer limit, String error) {
        this.data = data;
        this.total = total;
        this.limit = limit;
        this.skip = skip;
        this.error = error;
    }
    
    

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public Integer getLimit() {
        return limit;
    }

    public void setLimit(Integer limit) {
        this.limit = limit;
    }

    public Integer getSkip() {
        return skip;
    }

    public void setSkip(Integer skip) {
        this.skip = skip;
    }

    
    
}
