<template>
  <div class="main-page-content">
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <div slot="header">
        <span>导入客户</span>
      </div>
      <!-- card body -->
      <el-form
        ref="modelRef"
        class="createTarget-wrap"
        :model="modelRef"
        :rules="rules"
        label-width="120px"
        size="normal"
      >
        <el-form-item label="国家/地区" prop="activeCountry">
          <div class="vti__dropdown-wrap">
            <el-select
              v-model="modelRef.activeCountry"
              clearable
              filterable
              @filter-method="changeCountry"
              @change="handleSelectChange"
            >
              <el-option
                v-for="item in allCountries"
                :key="item.iso2"
                :label="`${item.name} (${item.iso2}) ${item.dialCode}`"
                :value="item.dialCode"
                class="ant-select-dropdown-menu-item"
              >
                <div :title="item.iso2">
                  <div :class="['vti__flag', item.iso2.toLowerCase()]"></div>
                  <span>{{ `${item.name} (${item.iso2}) ${item.dialCode}` }}</span>
                </div>
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="备注" size="normal" prop="remark">
          <el-input v-model="modelRef.remark" placeholder="请输入备注信息" size="normal" clearable />
        </el-form-item>
        <el-form-item label="添加数据" size="normal" prop="target">
          <el-upload
            ref="upload"
            :action="uploadUrl"
            accept=".xlsx, .txt"
            :headers="uploadHeaders"
            :data="uploadParams"
            show-file-list
            with-credentials
            name="target"
            :before-upload="handleBeforeUpload"
            :on-change="handleChange"
            :on-error="uploadError"
            :on-success="uploadSuccess"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary" icon="el-icon-files">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">
              支持扩展名：
              <el-button type="text" @click="downloadExcel">.xlsx(模板下载)</el-button>
              <el-button type="text" @click="downloadTxt">.txt(模板下载)</el-button>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label size="normal">
          <el-button type="primary" size="small" @click="handleSubmit">提交</el-button>
          <el-button size="small" @click="handleCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import allCountries from '@/assets/all-countries'
import { getToken } from '@/utils/auth'
import '@/assets/sprite.css'
export default {
  data() {
    const validFile = (r, v, cb) => {
      console.log('this.modelRef.target', this.modelRef.target)
      if (this.fileList.length !== 0) {
        cb()
      } else {
        cb(new Error('数据不能为空'))
      }
    }
    return {
      modelRef: {
        activeCountry: undefined,
        target: undefined
      },
      rules: {
        label_name: [{ required: true, message: '分组名称不能为空', trigger: 'change' }],
        activeCountry: [{ required: true, message: '国家/地区不能为空', trigger: 'change' }],
        target: [{ required: true, message: '数据不能为空', trigger: 'change', validator: validFile }]
      },
      open: false,
      allCountries,
      selectedCountryStr: undefined,
      filename: undefined,
      submitLoading: false,
      errorDetailModalVisible: false,
      errorDetailTableList: [],
      fileList: [],
      errorDetailColumns: [

      ],
      uploadParam: {},
      code: null
    }
  },
  computed: {
    uploadHeaders() {
      return { Authorization: `Bearer ${getToken()}` }
    },
    uploadUrl() {
      return `${process.env.VUE_APP_BASE_URL}/target/add_target`
    },
    uploadParams() {
      return { remark: this.modelRef.remark, code: this.modelRef.activeCountry }
    }
  },
  created() {

  },
  methods: {
    changeCountry(val) {
      console.log('val search ---> ', val)
      this.allCountries = this.allCountries.filter(item => {
        return item.name.toLowerCase().includes(val.toLowerCase()) || item.iso2.toLowerCase() === val.toLowerCase() || item.dialCode.includes(val)
      })
    },
    handleSelectChange(val) {

    },
    handleBeforeUpload(file) {
      // console.log('file ---> ', file)
      // 取文件名
      const suffix_index = file.name.lastIndexOf('.')
      this.uploadParams.file_name = file.name.substring(0, suffix_index)
    },
    handleChange(file, fileList) {
      // console.log(file)
      this.fileList = fileList
    },
    uploadError(err, file, fileList) {
      console.log(err)
      this._warnConfirm('上传出现问题！请联系管理员')
    },
    uploadSuccess({ code, msg }, file, fileList) {
      console.log('====================================')
      console.log('上传响应 ===> ', code, msg)
      console.log('====================================')
      if (code !== 200) {
        this.$message.error(msg || '请求出错')
        return
      }
      this.$router.push({ name: 'target.target_list' })
    },
    handleSubmit() {
      this.$refs.modelRef.validate(async valid => {
        if (valid) {
          this.$refs.upload.submit()
        } else {
          this.$message.error('数据验证失败，请检查必填项数据！')
        }
      })
    },
    handleCancel() {
      this.$initFormData('modelRef')
    },
    downloadExcel() {
      window.location.href = '/app/add_target_test.xlsx'
    },
    downloadTxt() {
      window.location.href = '/app/add_target_test.rar'
    }
  }
}
</script>

<style lang="scss" scoped>
.createTarget-wrap {
  width: 450px;
  margin: 0 auto;
  .el-form-item {
    width: 100%;
    .el-form-item__content {
      width: calc(100% - 120px) !important;
      .el-select {
        width: 100%;
      }
    }
  }
}
.vti__dropdown-wrap {
  position: relative;
}
.vti__dropdown-list {
  width: 100%;
  height: 250px;
  top: 0;
  left: 0;
  overflow: auto;
  z-index: 9999;
}
.vti__flag {
  display: inline-block;
  margin-right: 5px;
}
</style>

