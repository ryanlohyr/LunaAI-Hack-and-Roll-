from backend.classes.app_types import Query
from backend.vector_database.retrieve import get_context
import sys

def main():
    output = get_context(sys.argv[1])
    sys.stdout.flush()

if __name__ == "__main__":
    main()
