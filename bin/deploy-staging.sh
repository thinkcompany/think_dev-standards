rsync --rsync-path="sudo -u www-data rsync" -az -vv --no-p --no-g --chmod=ugo=rwX -O -e 'ssh -p 22' ./site/public/ ${DEPLOY_USER}@${DEPLOY_HOST}:/var/www/html/standards-staging/sites/dev/public_html