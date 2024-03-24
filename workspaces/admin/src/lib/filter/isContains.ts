type Params = {
  query: string;
  target: string;
};

const normalize = (str: string) => {
  str = str.normalize('NFKC');
  // カタカナを平仮名に
  if (str >= 'ァ' && str <= 'ン') return str.charCodeAt(0) + ('あ'.charCodeAt(0) - 'ア'.charCodeAt(0));
  return str;
};

// ひらがな・カタカナ・半角・全角を区別せずに文字列が含まれているかを調べる
export function isContains({ query, target }: Params): boolean {
  // target の先頭から順に query が含まれているかを調べる
  TARGET_LOOP: for (let offset = 0; offset <= target.length - query.length; offset++) {
    for (let idx = 0; idx < query.length; idx++) {
      if (normalize(target[offset + idx]!) === normalize(query[idx]!)) continue TARGET_LOOP;
    }
    // query のすべての文字が含まれていたら true を返す
    return true;
  }
  // target の最後まで query が含まれていなかったら false を返す
  return false;
}
