import createModule from './python.mjs';

console.warn("\n이 웹페이지는 엄청난 양의 주기억장치 용량과\n높은 CPU, GPU 성능이 요구되며 렉을 유발할 수 있습니다\n이 점에 주의해 주십시오\n\nWarn Code : 0000 (need high hardware performance)");

async function python_load(){
    let load_complete = false;
  try {
  const log = s => (document.getElementById('log').textContent += s + '\n');

  window.Module = await createModule({
    locateFile: p => p,
    print: log,
    printErr: log,
    noInitialRun: true,
    preRun(mod) {
      mod.FS.createPreloadedFile('/', 'python314.zip', 'python314.zip', true, true);
      mod.ENV.PYTHONHOME = '/';
      mod.ENV.PYTHONPATH = '/python314.zip';
      mod.ENV.PYTHONDONTWRITEBYTECODE = '1';
    },
  });
  window.py = code => window.Module.callMain(['-S','-c', code]);
  load_complete = true;
  } catch(e){
    console.log(`python loaded error by ${e}`)
    load_complete = false;
  } finally{
    if (load_complete){
        console.log("---\n\nPython3.14 wasm loaded\n\n---")
    } else {
        console.log("Something wrong check pls")
    }
  }
}