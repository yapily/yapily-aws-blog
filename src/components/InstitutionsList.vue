<template>
  <div>
    <h1 class="text-center text-bold mb-5">Select an institution</h1>
    <div class="institute-input-container">
      <input
        placeholder="search"
        class="institution-search-input"
        v-model="institutionSearch"
      />
    </div>
    <div
      class="institutions-row"
      v-if="filterInstitutions && filterInstitutions.length"
    >
      <div
        v-for="institution in filterInstitutions"
        :key="institution.id"
        class="institutions-item"
        @click="$emit('institutionSelected', institution.id)"
      >
        <div class="institution-content">
          <div v-for="mediaItem in institution.media" :key="mediaItem.source">
            <ItemImage
              v-if="mediaItem.type === mediaType"
              :src="mediaItem.source"
              :id="activeFilters"
            />
          </div>

          <div class="institution-title">{{ institution.name }}</div>
        </div>
      </div>
    </div>
    <div
      class="text-center"
      v-if="filterInstitutions && !filterInstitutions.length"
    >
      <p>No institution found</p>
    </div>
  </div>
</template>

<script>
import ItemImage from "@/components/common/ItemImage";
export default {
  name: "InstitutionsList",
  components: { ItemImage },
  props: {
    institutions: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      institutionSearch: "",
      mediaType: "icon",
      activeFilters: [],
    };
  },
  async mounted() {},
  computed: {
    filterInstitutions() {
      return this.institutions.filter((institution) => {
        return institution.name
          .toLowerCase()
          .includes(this.institutionSearch.toLowerCase());
      });
    },
  },
};
</script>
