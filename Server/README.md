# README

    bundle install --without production  
    rake db:migrate  
    bundle exec rails server -b 0.0.0.0  

> Install Sidekiq  

    sudo apt-get install redis-server -y  
    bundle exec sidekiq -q sending  
