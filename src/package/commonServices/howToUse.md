## 실제 적용된 파일

- `features/agency/agencyComponents/AgencyArtistModal.jsx` 컴포넌트에서 postMutation, putMutation, deleteMutation 사용
- `features/agency/agencyServices/useAgencyArtistModal.js` 커스텀 후크에서 usePostMutation, usePutMutation, useDeleteMutation 세팅함

## GET 사용할 때

1. GET으로 받아올 자료를 useQuery를 이용해 받아옵니다.

- 이 때 `queryKey`로는 api 엔드포인트를 사용합니다(search params 포함).
- `data`, `isPending`, `error`은 모두 상태입니다.

```js
const { data, isPending, error } = useQuery({
    queryKey: ["/api/companies/artists"],
    queryFn: () => axiosReturnsData("GET", "/api/companies/artists"),
});
```

2. 받아온 data는 상태입니다. 이 상태가 변할 때마다 스토어에 반영되게 useEffect를 사용합니다.

```js
useEffect(() => {
    if (!data) {
        return;
    }
    setArtistArray(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [data]);
```

- 전체 코드

```js
const useAgency = () => {
    const setArtistArray = useLinkUpStore((state) => state.setArtistArray);
    const { data, isPending, error } = useQuery({
        queryKey: ["/api/companies/artists"],
        queryFn: () => axiosReturnsData("GET", "/api/companies/artists"),
    });

    useEffect(() => {
        if (!data) {
            return;
        }
        setArtistArray(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return {
        error,
        isPending,
    };
};
```

## POST, UPDATE, DELETE 요청 -> UI에 즉각 반영 -> 성공 여부에 따라서 반영한 것 수정

1. 응답이 오기 전에 UI에 먼저 반영을 하고 싶을 땐 아래의 함수들을 사용할 수 있습니다.

- `usePostMutation`
- `usePutMutation`
- `useDeleteMutation`
  이들은 모두 `/src/package/commonServices/tanstackQueryVariants.js`에서 확인할 수 있습니다.

2. 사용할 커스텀 후크를 호출합니다.

```js
const postMutation = usePostMutation(
    `/api/companies/artists/${id}`,
    "/api/companies/artists",
    convertFormDataToArtist,
);
```

이 때 들어가는 전달 인자는 아래와 같습니다.

```js
usePostMutation(포스트 엔드포인트, useQuery에서 사용한 엔드포인트, 필요하다면 변환 함수)
```

변환 함수는 요청 시 보내는 body를 그대로 스토어에 추가할 수 없을 때 사용합니다.
예를 들어 formData를 body로 보냈을 경우, 스토어에 맞게 객체로 변환하는 함수를 여가에 넣습니다.
(해당 함수는 직접 제작하셔야 합니다.)
만약 json으로 요청했고 바로 스토어에 넣을 수 있다면 비워두시면 됩나다.

3. post를 하기 위해 함수를 `mutate` 함수를 호출합니다.

```js
<button onClick={() => postMutation.mutate(body)}>출간하기</button>
```
