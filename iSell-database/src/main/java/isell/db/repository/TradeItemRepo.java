package isell.db.repository;

import isell.db.domain.TradeItem;
import org.springframework.context.annotation.Bean;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

@Service
public interface TradeItemRepo extends CrudRepository<TradeItem, Long> {
}
