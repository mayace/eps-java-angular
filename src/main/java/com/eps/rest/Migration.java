/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.eps.rest;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import org.flywaydb.core.*;
/**
 *
 * @author Basil Bourque
 */
@WebListener
public class Migration implements ServletContextListener {

    @Override
    public void contextInitialized ( ServletContextEvent sce ) {
        Flyway flyway = new Flyway();//.configure().dataSource("jdbc:oracle:thin:@159.89.229.217:49161:XE", "PRACTICAS14", "Practicas_14").load();
        //flyway.setDataSource("jdbc:oracle:thin:@159.89.229.217:49161:XE", "PRACTICAS14", "Practicas_14");
        flyway.setDataSource("jdbc:oracle:thin:@localhost:1521:XE", "PRACTICAS14", "Practicas_14");
        flyway.migrate();
    }

    @Override
    public void contextDestroyed ( ServletContextEvent sce ) {
        System.out.println ( "My Vaadin web app is shutting down." );
    }

}
