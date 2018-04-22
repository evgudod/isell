package isell.db.controller;

import com.google.gson.Gson;
import isell.db.domain.TradeItem;
import isell.db.repository.TradeItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by YU on 04/21/18.
 */
@Controller
public class TradeItemController {

    @Autowired
    TradeItemRepo tradeItemRepo;

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/tradeitems/all/{id}", method=RequestMethod.GET, produces= MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody String delete(@PathVariable String id){
        List<TradeItem> tradeItems = new ArrayList<>();
        tradeItemRepo.findAll().forEach(tradeItems::add);
        return new Gson().toJson(tradeItems);
    }
}
