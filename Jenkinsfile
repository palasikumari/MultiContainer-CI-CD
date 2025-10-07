pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'your-dockerhub-username'
    }

    stages {
        stage('Checkout Source') {
            steps {
                git url: 'your-git-repo-url', branch: 'main'
            }
        }

        stage('Build & Push Docker Images') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
                        sh "docker-compose build web"
                        def imageTag = "${DOCKER_REGISTRY}/my-nodejs-app:${env.BUILD_NUMBER}"
                        sh "docker tag my-nodejs-app:latest ${imageTag}"
                        sh "docker push ${imageTag}"
                    }
                }
            }
        }

        stage('Deploy Multi-Container App') {
            steps {
                script {
                    sh "docker stop node-web node-mongo-db || true"
                    sh "docker rm node-web node-mongo-db || true"
                    sh "BUILD_NUMBER=${env.BUILD_NUMBER} docker-compose up -d --force-recreate"
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
