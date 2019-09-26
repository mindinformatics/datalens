<?php

/**
 * @file
 * members.rules_defaults.inc
 */

/**
 * Implements hook_default_rules_configuration().
 */
function members_default_rules_configuration() {
  $items = array();
  $items['rules_follow_comments_rule'] = entity_import('rules_config', '{ "rules_follow_comments_rule" : {
      "LABEL" : "Follow Comments Rule",
      "PLUGIN" : "reaction rule",
      "OWNER" : "rules",
      "REQUIRES" : [ "flag", "rules", "comment" ],
      "ON" : { "comment_insert" : [] },
      "DO" : [
        { "flag_fetch_users_comment" : {
            "USING" : { "flag" : "follow_comments", "comment" : [ "comment" ] },
            "PROVIDE" : { "users" : { "users" : "Users who flagged" } }
          }
        },
        { "LOOP" : {
            "USING" : { "list" : [ "users" ] },
            "ITEM" : { "list_item" : "Current list item" },
            "DO" : [
              { "mail" : {
                  "to" : [ "list-item:mail" ],
                  "subject" : "New comment",
                  "message" : "There is a new comment on the flagged post.",
                  "language" : [ "" ]
                }
              }
            ]
          }
        }
      ]
    }
  }');
  $items['rules_follow_nodes_rule'] = entity_import('rules_config', '{ "rules_follow_nodes_rule" : {
      "LABEL" : "Follow Nodes Rule",
      "PLUGIN" : "reaction rule",
      "OWNER" : "rules",
      "REQUIRES" : [ "flag", "rules", "comment" ],
      "ON" : { "comment_insert" : [] },
      "DO" : [
        { "flag_fetch_users_node" : {
            "USING" : { "flag" : "follow_node", "node" : [ "comment:node" ] },
            "PROVIDE" : { "users" : { "users" : "Users who flagged" } }
          }
        },
        { "LOOP" : {
            "USING" : { "list" : [ "users" ] },
            "ITEM" : { "list_item" : "Current list item" },
            "DO" : [
              { "mail" : {
                  "to" : [ "list-item:mail" ],
                  "subject" : "New Comment",
                  "message" : "A comment was added to [comment:node:title], which you are following on [site:url]:\\r\\n\\r\\n[comment:author:name]\\r\\n[comment:title]\\r\\n[comment:body]\\r\\n\\r\\nIf you prefer not to receive these messages, please log in to [site:url], and adjust your settings in your profile.",
                  "from" : [ "" ],
                  "language" : [ "" ]
                }
              }
            ]
          }
        }
      ]
    }
  }');
  $items['rules_follow_users'] = entity_import('rules_config', '{ "rules_follow_users" : {
      "LABEL" : "Follow Users Content",
      "PLUGIN" : "reaction rule",
      "OWNER" : "rules",
      "REQUIRES" : [ "flag", "rules" ],
      "ON" : { "node_insert" : [] },
      "DO" : [
        { "flag_fetch_users_user" : {
            "USING" : { "flag" : "follow_users", "user" : [ "node:author" ] },
            "PROVIDE" : { "users" : { "users" : "Users who flagged" } }
          }
        },
        { "LOOP" : {
            "USING" : { "list" : [ "users" ] },
            "ITEM" : { "list_item" : "Current list item" },
            "DO" : [
              { "mail" : {
                  "to" : [ "list-item:mail" ],
                  "subject" : "New on [site:url] ",
                  "message" : "A member you are following, ([node:author:name]), has posted new content to [site:url]: \\r\\n\\r\\n[node:url]\\r\\n[node:author:name]\\r\\n[node:title]\\r\\n[node:body]",
                  "language" : [ "" ]
                }
              }
            ]
          }
        }
      ]
    }
  }');
  $items['rules_follow_users_comments'] = entity_import('rules_config', '{ "rules_follow_users_comments" : {
      "LABEL" : "Follow Users Comments",
      "PLUGIN" : "reaction rule",
      "OWNER" : "rules",
      "REQUIRES" : [ "flag", "rules", "comment" ],
      "ON" : { "comment_insert" : [] },
      "DO" : [
        { "flag_fetch_users_user" : {
            "USING" : { "flag" : "follow_users", "user" : [ "comment:author" ] },
            "PROVIDE" : { "users" : { "users" : "Users who flagged" } }
          }
        },
        { "LOOP" : {
            "USING" : { "list" : [ "users" ] },
            "ITEM" : { "list_item" : "Current list item" },
            "DO" : [
              { "mail" : {
                  "to" : [ "list-item:mail" ],
                  "subject" : "New on [site:url] ",
                  "message" : "A member you are following has posted a new comment to [site:url]: \\r\\n\\r\\n[comment:author:name]\\r\\n[comment:title]\\r\\n[comment:body]",
                  "language" : [ "" ]
                }
              }
            ]
          }
        }
      ]
    }
  }');
  return $items;
}
