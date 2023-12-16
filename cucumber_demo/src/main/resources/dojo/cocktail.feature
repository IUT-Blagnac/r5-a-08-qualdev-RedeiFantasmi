Feature: Cocktail Ordering

    As Romeo, I want to offer a drink to Juliette so that we can discuss together (and maybe more).

    Scenario: Creating an empty order
        Given Romeo who wants to buy a drink
        When  an order is declared for Juliette
        Then  there is no cocktail in the order

    Scenario Outline: Creating an empty order
        Given "<from>" who wants to buy a drink
        When an order is declared for "<to>"
        Then there is <nbCocktails> cocktails in the order

        Examples:
            | from  | to       | nbCocktails |
            | Romeo | Juliette |           0 |
            | Tom   | Jerry    |           0 |

    Scenario Outline: Sending a message with an order
        Given "<from>" who wants to buy a drink
        When an order is declared for "<to>"
        And a message saying "<message>" is added
        Then the ticket must say "<expected>"

    Examples:
        | from  | to       | message     | expected                            |
        | Romeo | Juliette | Wanna chat? | From Romeo to Juliette: Wanna chat? |
        | Tom   | Jerry    | Hei!        | From Tom to Jerry: Hei!             |