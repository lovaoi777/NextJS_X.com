"use client";
import style from "./RightSearchZone.module.css";
import { usePathname } from "../../../../node_modules/next/navigation";
import SearchForm from "./SerachForm";
import {useRouter, useSearchParams} from "next/navigation";
export default function RightSearchZone() {
  const path = usePathname();
  const searchParams = useSearchParams()
  const router = useRouter();
  const onChangeAll = () => {
  let url = `/search?q=${searchParams.get('q')}&pf=on`
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('pf','on')
    router.replace(`/search?${newSearchParams.toString()}`)
  };
  const onChangeFollow = () => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.delete('pf')
    router.replace(`/search?${newSearchParams.toString()}`)
  };

  if (path == "/explore") return null;
  if (path == "/search") {
    return (
      <div>
        <h5 className={style.filterTitle}>검색 필터</h5>
        <div className={style.filterSection}>
          <div>
            <label>사용자</label>
            <div className={style.radio}>
              <div>모든 사용자</div>
              <input
                type="radio"
                name="pf"
                defaultChecked
                onChange={onChangeAll}
              />
            </div>
            <div className={style.radio}>
              <div>내가 팔로우하는 사람들</div>
              <input
                type="radio"
                name="pf"
                value="on"
                onChange={onChangeFollow}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div style={{ marginBottom: 60, width: "inherit" }}>
      <SearchForm />
    </div>
  );
}
