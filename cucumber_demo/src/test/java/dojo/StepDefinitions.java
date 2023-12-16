package dojo;

import static org.junit.Assert.assertEquals;

import java.util.List;

import cucumber.api.java.en.And;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;

public class StepDefinitions {
    private Order order;

    @Given("Romeo who wants to buy a drink")
    public void romeo_who_wants_to_buy_a_drink() {
        order = new Order();
        order.declareOwner("Romeo");
    }

    @When("an order is declared for Juliette")
    public void an_order_is_declared_for_Juliette() {
        order.declareTarget("Juliette");
    }

    @Then("there is no cocktail in the order")
    public void there_is_no_cocktail_in_the_order() {
        List<String> cocktails = order.getCocktails();
        assertEquals(0, cocktails.size());
    }

    @Given("{string} who wants to buy a drink")
    public void who_wants_to_buy_a_drink(String buyer) {
        order = new Order();
        order.declareOwner(buyer);
    }

    @When("an order is declared for {string}")
    public void an_order_is_declared_for(String receiver) {
        order.declareTarget(receiver);
    }

    @And("a message saying {string} is added")
    public void a_message_saying_is_added(String message) {
        order.setMessage(message);
    }

    @Then("the ticket must say {string}")
    public void the_ticket_must_say(String excepted) {
        String message = order.getMessage();
        assertEquals(excepted, message);
    }

    @Then("there is {int} cocktails in the order")
    public void there_is_cocktails_in_the_order(int nbCocktails) {
        List<String> cocktails = order.getCocktails();
        assertEquals(nbCocktails, cocktails.size());
    }
}
