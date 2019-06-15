package com.mballem.demoajax;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.mballem.demoajax.domain.SocialMetaTag;
import com.mballem.demoajax.service.SocialMetaTagService;

@SpringBootApplication
public class DemoAjaxApplication implements CommandLineRunner{

	public static void main(String[] args) {
		SpringApplication.run(DemoAjaxApplication.class, args);
	}
	
	@Autowired
	private SocialMetaTagService service;

	@Override
	public void run(String... args) throws Exception {
		 
		SocialMetaTag tag = service.getSocialMetaTag("https://www.pichau.com.br/placa-mae-asus-prime-b450m-a-ddr4-socket-am4-chipset-amd-b450");
		
		System.out.println(tag.toString());

	}

}
