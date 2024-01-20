from backend.classes.app_types import Query
from backend.vector_database.retrieve import get_context

def main(query: Query):
    return get_context(query.question)

if __name__ == "__main__":
    main()
