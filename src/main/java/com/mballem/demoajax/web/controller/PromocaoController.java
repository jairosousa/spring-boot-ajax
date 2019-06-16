package com.mballem.demoajax.web.controller;

import com.mballem.demoajax.domain.Categoria;
import com.mballem.demoajax.domain.Promocao;
import com.mballem.demoajax.repository.CategoriaRepository;
import com.mballem.demoajax.repository.PromocaoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("promocao")
public class PromocaoController {

    private static Logger log = LoggerFactory.getLogger(PromocaoController.class);

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private PromocaoRepository promocaoRepository;

    // ==========AUTOCOMPLETE================
    @GetMapping("site")
    public ResponseEntity<?> autocompleteByTermo(@RequestParam("termo") String termo) {
        List<String> sites = promocaoRepository.findSitesByTermo(termo);
        return ResponseEntity.ok(sites);
    }

    @GetMapping("site/list")
    public String listarPorSite(@RequestParam("site") String site, ModelMap model) {
        Sort sort = new Sort(Sort.Direction.DESC, "dtCadastro");
        PageRequest pageRequest = PageRequest.of(0, 8, sort);
        model.addAttribute("promocoes", promocaoRepository.findBySite(site, pageRequest));
        return "promo-card";
    }

    // ==========ADD LIKES================
    @PostMapping("like/{id}")
    public ResponseEntity<?> adicionarLikes(@PathVariable("id") Long id) {
        promocaoRepository.updateSomarLikes(id);
        int likes = promocaoRepository.findLikesById(id);

        return ResponseEntity.ok(likes);
    }

    // ==========LISTAR OFERTAS================
    @GetMapping("list")
    public String listarOfertas(ModelMap model) {
        Sort sort = new Sort(Sort.Direction.DESC, "dtCadastro");
        PageRequest pageRequest = PageRequest.of(0, 8, sort);
        model.addAttribute("promocoes", promocaoRepository.findAll(pageRequest));

        return "promo-list";
    }

    @GetMapping("list/ajax")
    public String listarCards(@RequestParam(name = "page", defaultValue = "1") int page, ModelMap model) {
        Sort sort = new Sort(Sort.Direction.DESC, "dtCadastro");
        PageRequest pageRequest = PageRequest.of(page, 8, sort);
        model.addAttribute("promocoes", promocaoRepository.findAll(pageRequest));

        return "promo-card";
    }

    // ==========ADD OFERTAS================
    @ModelAttribute("categorias")
    public List<Categoria> getCategorias() {
        return categoriaRepository.findAll();
    }

    @GetMapping("add")
    public String abrirCadastro() {
        return "promo-add";
    }

    @PostMapping("save")
    public ResponseEntity<?> salvarPromocao(@Valid Promocao promocao, BindingResult result) {

        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.unprocessableEntity().body(errors);
        }

        log.info("Promoção {}", promocao.toString());
        promocao.setDtCadastro(LocalDateTime.now());
        promocaoRepository.save(promocao);

        return ResponseEntity.ok().build();
    }
}
