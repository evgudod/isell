package isell.db.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

/**
 * Created by YU on 04/21/18.
 */
@Entity
public class TradeItem {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int gid;
    private int id;
    private int lvl;
    private String clazz;
    private Integer parentid;
    private String name;
}
