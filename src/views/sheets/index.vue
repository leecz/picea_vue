<template>
  <div>
    数据首页

    <div>
      <router-link :to="{ name: 'sheets_new' }">
        <el-button type="primary">上传数据</el-button>
      </router-link>
    </div>
    <div class="mt3">
      <el-table :data="dataset" border style="width: 600px;">
        <el-table-column prop="name" label="数据名" width="180">
        </el-table-column>
        <el-table-column prop="inserted_at" label="上传时间"> </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              @click="handleEditClick(scope.row)"
              type="text"
              size="small"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { SheetService } from "@/common/api.service";

export default {
  name: "sheet-index",
  data() {
    return {
      dataset: []
    };
  },
  methods: {
    getList() {
      SheetService.list().then(res => {
        this.dataset = res.data.data;
      });
    },
    handleEditClick() {}
  },
  mounted() {
    this.getList();
  }
};
</script>
