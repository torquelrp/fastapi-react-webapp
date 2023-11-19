from pydantic.generics import GenericModel
from typing import TypeVar, Generic, List

T = TypeVar("T")

class ResponseDataList(GenericModel, Generic[T]):
    data_list: List[T]
