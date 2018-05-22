# sudo su
# cd /var/www/html/cats
# drush sql-dump --result-file=/var/www/html/dumps/cats_2017_01_31.sql
# scp mym39@cats.dipr.partners.org:/var/www/html/dumps/cats_2017_01_31.sql .
echo "Clearing database...Loading new database"
#Comment out next 2 lines to prevent dropping/reloading db
drush sql-drop -y
#drush sqlc < ../downloads/mind-template_dev_2016-05-06T15-12-17_UTC_database.sql
drush sqlc < cats_2018_03_07.sql
echo "Finished loading drupal db."
echo "Running db updates.."
drush -y updb
echo "Clearing caches..."
drush cc all
#open -a Firefox `drush --uri=http://localhost:8888/j-alz/ uli`
open -a Google\ Chrome `drush --uri=http://localhost:8888/ uli`
echo "Please run drush fra -y --force manually!!"
#drush fra -y --force
# This is probably already enabled.
#drush en -y views_ui
drush cc all
