# language: en
Feature: Is it friday yet ?

    Scenario: Sunday isn't Friday
        Given today is "Sunday"
        When I ask whether it's Friday yet
        Then I should be told "Nope"

    Scenario: Friday is Friday
        Given today is "Friday"
        When I ask whether it's Friday yet
        Then I should be told "TGIF"

    Scenario Outline: asking friday
        Given today is "<day>"
        When I ask whether it's Friday yet
        Then I should be told "<answer>"

        Examples:
            | day            | answer |
            | Friday         | TGIF   |
            | Sunday         | Nope   |
            | anything else! | Nope   |
