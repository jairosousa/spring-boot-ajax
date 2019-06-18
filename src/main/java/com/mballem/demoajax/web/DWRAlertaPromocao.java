package com.mballem.demoajax.web;

import com.mballem.demoajax.repository.PromocaoRepository;
import org.directwebremoting.WebContext;
import org.directwebremoting.WebContextFactory;
import org.directwebremoting.annotations.RemoteMethod;
import org.directwebremoting.annotations.RemoteProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Timer;
import java.util.TimerTask;

@Component
@RemoteProxy
public class DWRAlertaPromocao {

    @Autowired
    private PromocaoRepository repository;

    private Timer timer;

    private LocalDateTime getCadastroByUltimaPromocao() {
        PageRequest pageRequest = PageRequest.of(0, 1, Sort.Direction.DESC, "dtCadastro");
        return repository.findUltimaDataDePromocao(pageRequest)
                .getContent()
                .get(0);
    }

    @RemoteMethod
    public synchronized void init() {
        System.out.println("DRW está ativado");

        LocalDateTime lastDate = getCadastroByUltimaPromocao();

        WebContext context = WebContextFactory.get();

        timer = new Timer();
        timer.schedule(new AlertTask(context, lastDate), 10000, 60000);
    }

    class AlertTask extends TimerTask {

        private WebContext context;
        private LocalDateTime lastDate;
        private long count;

        public AlertTask(WebContext context, LocalDateTime lastDate) {
            this.context = context;
            this.lastDate = lastDate;
        }

        @Override
        public void run() {

        }
    }

}
