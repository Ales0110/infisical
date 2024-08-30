    
    provider "google" {
    project = "diplom-433408"
    region  = "us-central1"
    }

## k8s
    resource "google_container_cluster" "primary" {
    name     = "infisical-cluster"
    location = "us-central1-a"

    initial_node_count = 2

    node_config {
        machine_type = "e2-medium"
    }
    }

    output "kubeconfig" {
    value = google_container_cluster.primary.endpoint
    }

## postgres and redis
    resource "google_sql_database_instance" "postgres" {
    name             = "infisical-db"
    database_version = "POSTGRES_13"
    region           = "us-central1"

    settings {
        tier = "db-f1-micro"
    }
    }

    resource "google_sql_database" "database" {
    name     = "infisical"
    instance = google_sql_database_instance.postgres.name
    }

    resource "google_redis_instance" "redis" {
    name           = "infisical-redis"
    tier           = "STANDARD_HA"
    memory_size_gb = 1
    region         = "us-central1"
    }