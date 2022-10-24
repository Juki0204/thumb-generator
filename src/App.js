import * as React from "react";
import {useState} from 'react';

import html2canvas from 'html2canvas';

import './App.css';

//背景画像
function imgPreview(e){
  console.log(e);
  var file = e.target.files[0];
  var reader = new FileReader();
  var preview = document.getElementById("eyecatchExport");
  var previewImage = document.getElementById("previewImage");

  if(previewImage !== null){
      preview.removeChild(previewImage);
  }
  reader.onload = function() {
      // var img = document.createElement("img");
      // img.setAttribute("src", reader.result);
      // img.setAttribute("id", "previewImage");
      // preview.appendChild(img);
      preview.style.backgroundImage = 'url(' + reader.result + ')';
  };
  reader.readAsDataURL(file);
}

//画像保存
const saveAsImage = uri => {
  const downloadLink = document.createElement("a");

  if(typeof downloadLink.download === "string") {
    downloadLink.href = uri;

    downloadLink.download = "blog_eyecatch.jpg";

    document.body.appendChild(downloadLink);

    downloadLink.click();

    document.body.removeChild(downloadLink);
  }else{
    window.open(uri);
  }
}

const exportImage = () => {
  const target = document.getElementById("eyecatchExport");
  html2canvas(target).then(canvas => {
    const targetImgUri = canvas.toDataURL("img/jpg");
    saveAsImage(targetImgUri);
  });
}


export default function App(){
  const [mainTtl, setMainTtl] = useState("メインタイトル");
  const [subTtl, setSubTtl] = useState("サブテキスト");

  return(
      <div className="wrapper">
        <h1>ブログ用アイキャッチジェネレーター</h1>
          <div id="eyecatchExport">
            <div className="overlay">
                <div className="txtBox">
                  <span className="mainTtl" dangerouslySetInnerHTML={{__html:`${mainTtl.replace(/\s/g, '<br />')}`}}></span><br />
                  <p className="subTtl">{subTtl}</p>
                </div>
            </div>
          </div>
        <div className="createForm">
          <dl id="createFormList">
            <dt><label>【 背景画像 】</label></dt><dd><input type="file" onChange={(image) => imgPreview(image)} /></dd>

            <dt><label>【 メインタイトル 】<small>※1行13文字以内、2行まで</small> </label></dt>
            <dd><input className="mainTtlForm" type="text" onChange={(mainTtl) => setMainTtl(mainTtl.target.value)} /><small> ※改行する場合はスペースを入力</small></dd>
            
            <dt><label>【 サブタイトル 】<small>※全角18文字まで</small> </label></dt><dd><input className="subTtlForm" type="text" onChange={(subTtl) => setSubTtl(subTtl.target.value)} /></dd>
            <dt><label>【 画像出力 】</label></dt><dd><button onClick={() => exportImage()} >画像データを出力する</button></dd>
          </dl>
        </div>
        <div className="information">
        <h2>- 使い方 -</h2>
        <p>１.【背景画像】からアイキャッチの背景に使用したい画像を選択します。</p>
        <p>２.【メインタイトル】タイトルを入力します。改行したい場合はスペースを入力します。最大2行26文字まで表示可能です。</p>
        <p>３.【サブタイトル】に見出し文や概要など簡単な説明文を入力します。</p>
        <p>４.　一通り入力が出来たら【画像出力】の「画像データを出力する」ボタンをクリック。生成された画像データがダウンロードされます。</p>
        <p></p>
        <p></p>
        </div>
    </div>
  )
}