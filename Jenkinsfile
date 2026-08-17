pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Test') {
            steps {
                sh '''
                    docker run --rm \
                      -v /var/lib/docker/volumes/jenkins_home/_data${WORKSPACE#/var/jenkins_home}:/app \
                      -w /app \
                      node:20 \
                      npm test
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build -t myapp:v2 .
                '''
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                    docker rm -f myapp-container 2>/dev/null || true

                    docker run -d \
                      --network k3d-mycluster \
                      --name myapp-container \
                      myapp:v2
                '''
            }
        }

        stage('Smoke Test') {
            steps {
                sh '''
                    sleep 3
                    curl -f http://myapp-container:80
                '''
            }
        }
    }

    post {
        always {
            sh '''
                docker rm -f myapp-container 2>/dev/null || true
            '''
        }

        success {
            echo 'CI pipeline completed successfully!'
        }

        failure {
            echo 'CI pipeline failed. Check the stage logs above.'
        }
    }
}
