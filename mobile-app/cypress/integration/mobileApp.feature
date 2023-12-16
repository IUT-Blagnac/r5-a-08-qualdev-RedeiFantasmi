# language: en
Feature: Checking if user has to log in to the mobile app

# Scenario: After new day time, if they have not done it, user has to claim login bonus
#     Given it is 12:00
#     And the app change of day is at 11:00
#     And the user has not claimed the login bonus
#     Then user has to login to claim the login bonus

# Scenario: Stamina replinishing after time, if it is full, time is lost, so user has to empty it
#     Given stamina is at 140 out of 190
#     And it is 10:00
#     And it takes 5 minutes to replinish one stamina
#     Then user has to log in at 14:10

Scenario Outline: Check if user has to connect to claim login bonus
    Given it is "<currentTime>"
    And the app change of day is at "<dayChangeTime>"
    And the user <userClaimedState> claimed the login bonus
    Then the user "<userLoginState>" to login to claim the login bonus

    Examples:
        | currentTime | dayChangeTime | userClaimedState | userLoginState |
        | 12:00       | 11:00         | has not          | needs          |
        | 10:00       | 13:00         | has not          | doesn't need   |
        | 16:00       | 08:30         | has              | doesn't need   |
        | 16:20       | 16:30         | has not          | doesn't need   |

Scenario Outline: Check when the user has to log in to optimize stamina usage
    Given stamina is at <actualStamina> out of <totalStamina>
    And it is "<currentTime>"
    And it takes <replinishTime> minutes to replinish one stamina
    Then user has to log in at "<loginTime>"

    Examples:
        | actualStamina | totalStamina | currentTime | replinishTime | loginTime |
        | 140           | 190          | 11:00       | 5             | 15:10     |
        | 195           | 190          | 11:00       | 5             | 11:00     |
        | 45            | 80           | 18:00       | 3             | 19:45     |
