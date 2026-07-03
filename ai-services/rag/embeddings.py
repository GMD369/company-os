from functools import lru_cache

from sentence_transformers import SentenceTransformer

from app.config import settings


@lru_cache(maxsize=1)
def get_model() -> SentenceTransformer:
    return SentenceTransformer(settings.embedding_model_name)


def embed_texts(texts: list[str]) -> list[list[float]]:
    model = get_model()
    return model.encode(texts, convert_to_numpy=True).tolist()


def embed_query(text: str) -> list[float]:
    return embed_texts([text])[0]


def get_embedding_dim() -> int:
    return get_model().get_embedding_dimension()
