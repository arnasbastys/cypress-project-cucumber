Feature: W3 pages validation

  I want to navigate to w3 page and validate requirements

  Scenario Outline: Open w3 "<url>" page and validate console errors, response code, and links
    When I open "<url>" page
    Then I should not see errors in the console
    And Page should return status "<statusCode>"
    And All links should be valid
    Examples:
      | url                               | statusCode |
      | standards/badpage                 | 404        |
      | standards/webofdevices/multimodal | 200        |
      | standards/webdesign/htmlcss       | 200        |
