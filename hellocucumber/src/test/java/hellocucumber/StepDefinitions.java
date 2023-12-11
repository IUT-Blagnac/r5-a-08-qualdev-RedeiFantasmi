package hellocucumber;

import io.cucumber.java.en.*;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Assertions.*;

public class StepDefinitions {

    @Given("an example scenario")
    public void anExampleScenario() {
    }

    @When("all step definitions are implemented")
    public void allStepDefinitionsAreImplemented() {
    }

    @Then("the scenario passes")
    public void theScenarioPasses() {
    }


    public String day = "";

    static String isItFriday(String today) {
        return today.equals("Friday") ? "TGIF" : "Nope";
    }

    // @Given("today is Sunday")
    // public void today_is_sunday() {
    // }

    // @Given("today is Friday")
    // public void today_is_friday() {
    //     // Write code here that turns the phrase above into concrete actions
    //     throw new io.cucumber.java.PendingException();
    // }

    @Given("today is {string}")
    public void today_is(String string) {
        day = string;
    }

    @When("I ask whether it's Friday yet")
    public void i_ask_whether_it_s_friday_yet() {
    }

    @Then("I should be told {string}")
    public void i_should_be_told(String string) {
        assertEquals(string, isItFriday(day));
    }

}
