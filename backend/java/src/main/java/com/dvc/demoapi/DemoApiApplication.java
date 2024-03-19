package com.dvc.demoapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
@RestController
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.HEAD, RequestMethod.OPTIONS})
public class DemoApiApplication {
	List<ListItem> items = new ArrayList<ListItem>();
	Integer id = 0;

	public static void main(String[] args) {
		SpringApplication.run(DemoApiApplication.class, args);
	}

	@GetMapping("/todo")
	public List<ListItem> todo() {
		// Simuliere eine Verzögerung von 500ms
		try {
			Thread.sleep(500);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		return items;
	}

	@PostMapping("/todo")
	public ListItem postTodo(@RequestBody ListItem item) {
		items.add(new ListItem(id, item.getText(), item.getAuthor(), false));
		id++;
        return item;
    }

	@DeleteMapping("/todo")
	public List<ListItem> deleteTodo() {
		items.clear();

		return new ArrayList<ListItem>();
	}

	@DeleteMapping("/todo/{id}")
	public List<ListItem> deleteTodoId(@PathVariable int id) {
        items.removeIf(listItem -> listItem.getId() == id);

		return items;
	}


}
