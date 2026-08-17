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
                      -v "$WORKSPACE:/app" \
                      -w /app \
                      node:20 \
                      npm test
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t myapp:v2 .'
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker rm -f myapp-container || true'
                sh 'docker run -d -p 8083:80 --name myapp-container myapp:v2'
            }
        }

        stage('Smoke Test') {
            steps {
                sh '''
                    sleep 3
                    curl -f http://localhost:8083
                '''
            }
        }
    }

    post {
        always {
            sh 'docker rm -f myapp-container || true'
        }
    }
}
